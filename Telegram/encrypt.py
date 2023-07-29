from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad
import base64
import os

# Encryption key (should be kept secret)
encryption_key = b'f\xf3o\x86K\x1b\x01\xa3n.\x15va\xb5\x08+\x0f\xa8&O\xdfd\xf9\xc3\x8b\xbeR\xd2\xd5x\xf8s'  # Replace with your actual encryption key (must be 16, 24, or 32 bytes)

# Function to encrypt data using AES
def encrypt_aes(data):

    # Convert data to bytes
    data_bytes = data.encode()

    # Generate a random IV (Initialization Vector)
    iv = get_random_bytes(AES.block_size)

    # Create an AES cipher instance with CBC mode and the encryption key
    cipher = AES.new(encryption_key, AES.MODE_CBC, iv)

    # Pad the data to a multiple of the block size
    padded_data = pad(data_bytes, AES.block_size)

    # Encrypt the data
    encrypted_data = cipher.encrypt(padded_data)

    # Combine IV and encrypted data and encode as base64
    iv_and_encrypted_data = iv + encrypted_data
    return base64.b64encode(iv_and_encrypted_data).decode()

# Example usage
#required_information = "your_required_information_here"
#encrypted_data = encrypt_aes(required_information)
#print(f"Encrypted Data: {encrypted_data}")