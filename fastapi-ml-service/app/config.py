
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Validate required environment variables
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing required environment variables: SUPABASE_URL, SUPABASE_KEY")
