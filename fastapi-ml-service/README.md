
# ML Analysis FastAPI Service

This service provides machine learning analysis capabilities for the MCP application.

## Integrated ML Libraries

This service integrates with several powerful machine learning libraries:

- **statsmodels** - For ARIMA and SARIMA time series modeling
- **Prophet** - Facebook's time series forecasting library
- **scikit-learn** - For machine learning algorithms like Random Forest, SVM, and KMeans
- **XGBoost** - Advanced gradient boosting implementation
- **TensorFlow** - For deep learning models like LSTM (optional)
- **SciPy** - For statistical analyses like ANOVA

## Setup

1. Create a `.env` file with your Supabase credentials:

```
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-service-key
```

2. Install dependencies:

```
pip install -r requirements.txt
```

3. Run the server:

```
python main.py
```

The server will be available at http://localhost:8000

## API Endpoints

### POST /analyze/

Upload a file for analysis.

**Form Parameters:**
- `file`: The file to analyze
- `file_id`: The ID of the file record in Supabase
- `industry`: The industry category
- `model_type`: The model to use for analysis
- `parameters`: JSON string with model parameters (optional)

### POST /analyze/from-storage

Analyze a file that is already stored in Supabase.

**JSON Body:**
```json
{
  "file_id": "uuid-of-file",
  "industry": "retail",
  "model_type": "sarima",
  "parameters": {}
}
```

## Docker

Build the Docker image:

```
docker build -t ml-analysis-service .
```

Run the container:

```
docker run -p 8000:8000 --env-file .env ml-analysis-service
```

## Model Parameters

Each model type accepts specific parameters:

### Time Series Models
- **SARIMA**: p, d, q, P, D, Q, s (seasonal period)
- **ARIMA**: p, d, q
- **Prophet**: date_column, target_column, forecast_periods
- **LSTM**: sequence_length, epochs, forecast_steps

### Classification Models
- **Random Forest**: task (classification/regression), target_column
- **XGBoost**: task (classification/regression), target_column
- **SVM**: task (classification/regression), target_column

### Clustering Models
- **KMeans**: n_clusters, random_state

### Statistical Models
- **ANOVA**: group_column, value_column
