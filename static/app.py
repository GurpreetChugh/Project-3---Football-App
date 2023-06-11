from flask import Flask, render_template, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# Database Setup
#################################################
engine = create_engine("postgres://skbuqieh:YXm0YsioQnkqxA92fuujM6M9ozp8sLi5@ruby.db.elephantsql.com/skbuqieh")
Base = automap_base()
Base.prepare(engine, reflect=True)
# Base.metadata.tables # Check tables, not much useful
# Base.classes.keys() # Get the table names
#Measurement = Base.classes.measurement
#Station = Base.classes.station
table_names = Base.metadata.tables.keys()
print(table_names)

# app = Flask(__name__)

# @app.route('/')
# def home():
#     stadiums = [
#         {
#             'name': 'Wembley Stadium',
#             'location': 'London, England',
#             'capacity': '90,000',
#             'image': 'wembley.jpg',
#             'country': 'England'
#         },
#         {
#             'name': 'Emirates Stadium',
#             'location': 'London, England',
#             'capacity': '60,704',
#             'image': 'emirates.jpg',
#             'country': 'England'
#         },
#         {
#             'name': 'Camp Nou',
#             'location': 'Barcelona, Spain',
#             'capacity': '99,354',
#             'image': 'camp_nou.jpg',
#             'country': 'Spain'
#         },
#         {
#             'name': 'Santiago Bernabeu',
#             'location': 'Madrid, Spain',
#             'capacity': '81,044',
#             'image': 'bernabeu.jpg',
#             'country': 'Spain'
#         },
#         {
#             'name': 'Allianz Arena',
#             'location': 'Munich, Germany',
#             'capacity': '75,000',
#             'image': 'allianz_arena.jpg',
#             'country': 'Germany'
#         },
#         {
#             'name': 'San Siro',
#             'location': 'Milan, Italy',
#             'capacity': '75,923',
#             'image': 'san_siro.jpg',
#             'country': 'Italy'
#         },
#         {
#             'name': 'Parc des Princes',
#             'location': 'Paris, France',
#             'capacity': '47,929',
#             'image': 'parc_des_princes.jpg',
#             'country': 'France'
#         },
#         # Add more stadiums here
#     ]

#     return render_template('index.html', stadiums=stadiums)

# if __name__ == '__main__':
#     app.run(debug=True)
