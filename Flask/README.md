# Flask Backend 
This is the backend running that will be communicating with the Trailchaser mobile app.

The backend application is built with flask framework in python.

The following is a guide to setting up the backend to run.

1. Install python and pip package manager from online [python website](https://www.python.org/downloads/).
2. Then, install `virtualenv` by typing `pip install virtaulenv`
3. Create a virtual environment by typing `python -m venv 4521env` or `python3 -m venv 4521env`
4. To activate the virtual environment,
   - for windows, type `4521env\Scripts\activate` to activate the virtual environment
   - for mac osx, type source 4521env/bin/activate
5. Then, install the required python packages from `requirements.txt`, by entering the following command, `pip install -r requirements.txt`.

If you have installed new packages to the application, simply type `pip freeze > requirements.txt` to import all packages and its corresponding version to the `requirements.txt` file.