from flask import Flask, render_template, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from pprint import pprint
import sqlalchemy
from sqlalchemy import inspect
# Database Setup
#################################################
url= "postgresql://skbuqieh:YXm0YsioQnkqxA92fuujM6M9ozp8sLi5@ruby.db.elephantsql.com/skbuqieh"
engine = create_engine(url)

Base = automap_base()
Base.prepare(engine, reflect=True)
Base.metadata.tables # Check tables, not much useful
Base.classes.keys() # Get the table names
table_names = Base.metadata.tables.keys()
Stadiums = Base.classes.stadiums_data
Sunburst = Base.classes.sunburst_data
Wages = Base.classes.league_wages
Points = Base.classes.league_pts

app = Flask(__name__)
@app.route('/')
def home():
  return('this is my homepage')
  
@app.route('/api/stadiums/<league>')
def stadiums(league):
 session = Session(engine)
 response = session.query(Stadiums.city, Stadiums.club, Stadiums.stadium, Stadiums.cap,
                      Stadiums.country, Stadiums.longitude, Stadiums.latitude, Stadiums.trivia, Stadiums.league)\
                        .filter(Stadiums.league == league).all()
                        
 session.close()

 features = []
 for row in response:
    properties = {
        'City': row.city,
        'Stadium name': row.stadium,
        'Squad name': row.club,
        'Capacity': row.cap,
        'Stadium fact': row.trivia
    }
    geometry = {
        'type': 'Point',
        'coordinates': [row.latitude, row.longitude]
    }
    feature = {
        'type': 'Feature',
        'geometry': geometry,
        'properties': properties
    }
    features.append(feature)
 geojson_data = {
    'type': 'FeatureCollection',
    'features': features
 }

 return geojson_data



@app.route('/api/wages/points/<league>')
def wages_points(league):
 session = Session(engine)
 response_wages_pts = session.query(Wages.league,Wages.avgofannual_wages, Wages.squad, Points.avg_pts)\
                            .join(Points, Wages.squad == Points.squad)\
                            .filter(Wages.league == league)\
                            .order_by(Wages.league.asc(), Points.avg_pts.desc()).all()
 session.close()
 
 league_wage_pts = {}
 squad_names = []
 avg_wages = []
 avg_points = []
 for row in response_wages_pts:
    squad_name = row.squad
    wage = row.avgofannual_wages
    point = row.avg_pts
    squad_names.append(squad_name)
    avg_wages.append(wage)
    avg_points.append(point)


 league_wage_pts['league'] = 'league'
 league_wage_pts['squad_name'] = squad_names
 league_wage_pts['avg_wage'] = avg_wages
 league_wage_pts['points'] = avg_points
 return jsonify(league_wage_pts)
 
 #def home():
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

if __name__ == '__main__':
    app.run(debug=True)
