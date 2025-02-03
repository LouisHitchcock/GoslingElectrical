import os
from PIL import Image

def compress_and_downscale_images(input_folder, output_folder=None, quality=85, max_width=1000):
    # Ensure the input folder exists
    if not os.path.isdir(input_folder):
        print(f"The input folder '{input_folder}' does not exist.")
        return
    
    # If output_folder is not specified, overwrite the input images
    if output_folder is None:
        output_folder = input_folder
    else:
        # Create output folder if it doesn't exist
        os.makedirs(output_folder, exist_ok=True)
    
    # Get list of files in the input folder
    files = [f for f in os.listdir(input_folder) if os.path.isfile(os.path.join(input_folder, f))]
    
    for file in files:
        try:
            # Open the image file
            with Image.open(os.path.join(input_folder, file)) as img:
                # Calculate the new size while maintaining aspect ratio
                width_percent = (max_width / float(img.size[0]))
                new_height = int((float(img.size[1]) * float(width_percent)))
                new_size = (max_width, new_height)

                # Downscale the image if it's wider than max_width
                if img.size[0] > max_width:
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                
                # Compress and save the image
                output_path = os.path.join(output_folder, file)
                img.save(output_path, quality=quality, optimize=True)
                print(f"Compressed and downscaled '{file}' successfully.")
        except Exception as e:
            print(f"Error processing '{file}': {e}")

if __name__ == "__main__":
    input_folder = "./grid-gallery-images/uncompressed/"
    output_folder = "./grid-gallery-images/"  # Output to specified folder
    compress_and_downscale_images(input_folder, output_folder, quality=85, max_width=1000)
