from azure.storage.blob import BlobServiceClient
import os
from fastapi import UploadFile

def upload_image_to_azure(file: UploadFile, connection_string: str, container_name: str) -> str:
    try:
        # Create a BlobServiceClient
        blob_service_client = BlobServiceClient.from_connection_string(connection_string)

        # Create a container client
        container_client = blob_service_client.get_container_client(container_name)

        # Create the container if it does not exist
        if not container_client.exists():
            container_client.create_container()

        # Create a blob client using the filename as the name for the blob
        blob_client = container_client.get_blob_client(file.filename)

        # Upload the image to Azure Storage
        blob_client.upload_blob(file.file.read(), blob_type="BlockBlob")

        # Get the blob URL
        blob_url = blob_client.url

        return blob_url

    except Exception as ex:
        print(f'Exception: {ex}')
        return None
