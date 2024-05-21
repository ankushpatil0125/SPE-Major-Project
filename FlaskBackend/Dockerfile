# # For more information, please refer to https://aka.ms/vscode-docker-python
# FROM python:latest

# EXPOSE 5002

# WORKDIR /app
# COPY . /app

# # Install pip requirements
# COPY FlaskBackend/requirements.txt .
# RUN pip install -r requirements.txt

# # During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
# CMD ["gunicorn", "--bind", "0.0.0.0:5002", "app:app"]

# Use the latest Python image
FROM python:latest

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file
COPY FlaskBackend/requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY FlaskBackend /app

# Expose the port the app runs on
EXPOSE 5002

# Set the command to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5002", "app:app"]
