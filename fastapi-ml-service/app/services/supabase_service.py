
from supabase import create_client, Client
import logging
import os
from app.config import SUPABASE_URL, SUPABASE_KEY

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SupabaseService:
    def __init__(self):
        self.client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
    async def update_file_status(self, file_id: str, status: str, result_id: str = None) -> bool:
        """Update the status of a file in Supabase"""
        try:
            data = {"status": status}
            if result_id:
                data["result_id"] = result_id
                
            response = self.client.table("uploaded_files").update(data).eq("id", file_id).execute()
            
            if response.data:
                logger.info(f"Updated file {file_id} status to {status}")
                return True
            else:
                logger.error(f"Failed to update file {file_id} status")
                return False
        
        except Exception as e:
            logger.error(f"Error updating file status: {str(e)}")
            return False
            
    async def store_analysis_result(self, file_id: str, model_type: str, industry: str, 
                                   result: dict, metrics: dict) -> str:
        """Store analysis result in Supabase"""
        try:
            result_data = {
                "file_id": file_id,
                "model_type": model_type,
                "industry": industry,
                "result": result,
                "metrics": metrics,
                "status": "completed"
            }
            
            response = self.client.table("analysis_results").insert(result_data).execute()
            
            if response.data and len(response.data) > 0:
                result_id = response.data[0]["id"]
                logger.info(f"Stored analysis result with ID: {result_id}")
                return result_id
            else:
                logger.error("Failed to store analysis result")
                return None
        
        except Exception as e:
            logger.error(f"Error storing analysis result: {str(e)}")
            return None
            
    async def get_file_path(self, file_id: str) -> str:
        """Get the storage path for a file"""
        try:
            response = self.client.table("uploaded_files").select("file_path").eq("id", file_id).execute()
            
            if response.data and len(response.data) > 0:
                return response.data[0]["file_path"]
            else:
                logger.error(f"File with ID {file_id} not found")
                return None
                
        except Exception as e:
            logger.error(f"Error getting file path: {str(e)}")
            return None
            
    async def download_file(self, bucket: str, file_path: str, local_path: str) -> bool:
        """Download a file from Supabase storage"""
        try:
            response = self.client.storage.from_(bucket).download(file_path)
            
            with open(local_path, "wb") as f:
                f.write(response)
                
            logger.info(f"Downloaded file from {bucket}/{file_path} to {local_path}")
            return True
            
        except Exception as e:
            logger.error(f"Error downloading file: {str(e)}")
            return False

# Create a singleton instance
supabase_service = SupabaseService()
