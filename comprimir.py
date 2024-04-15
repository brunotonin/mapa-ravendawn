from PIL import Image
import os

def compress_images_in_folder(input_folder, output_folder, quality=85):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for root, dirs, files in os.walk(input_folder):
        for filename in files:
            if filename.endswith('.png'):
                input_path = os.path.join(root, filename)
                output_path = os.path.join(output_folder, os.path.relpath(input_path, input_folder))
                output_dir = os.path.dirname(output_path)
                if not os.path.exists(output_dir):
                    os.makedirs(output_dir)
                image = Image.open(input_path)
                image.save(output_path, quality=quality)

def compress_images_to_webp(input_folder, output_folder, quality=100):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for root, dirs, files in os.walk(input_folder):
        for filename in files:
            if filename.endswith('.png'):
                input_path = os.path.join(root, filename)
                output_path = os.path.join(output_folder, os.path.relpath(input_path, input_folder))
                output_path = os.path.splitext(output_path)[0] + '.webp'
                output_dir = os.path.dirname(output_path)
                if not os.path.exists(output_dir):
                    os.makedirs(output_dir)
                image = Image.open(input_path)
                image.save(output_path, 'WEBP', quality=quality)
# Exemplo de uso
input_folder = 'src/public/assets/map'
output_folder = 'src/public/assets/map_webp'
compress_images_to_webp(input_folder, output_folder)
