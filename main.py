from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home_page():
    title = "Planets in the Star Wars universe"
    return render_template("index.html", title=title)

if __name__ == '__main__':
    app.run(debug=True)