from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

class Email(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<Email {self.email}>'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    email = request.form['email']
    if email:
        new_email = Email(email=email)
        try:
            db.session.add(new_email)
            db.session.commit()
            flash('Email successfully submitted!', 'success')
        except Exception as e:
            db.session.rollback()
            flash('Error occurred while submitting the email.', 'danger')
    else:
        flash('Email is required!', 'warning')
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
