from flask import Flask, render_template, request, jsonify
from gi import get_GI
from waitress import serve 
app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
  return render_template('index.html')

@app.route('/GI')
def Load_info():
    inputbar = request.args.get('Food')

    # check for empty strings or string with only space
    if not bool(inputbar.strip()):
        inputbar = "Milky Way bar" #bc space lol

    GI_data = get_GI(inputbar)
    
    #input is not in database
    if not GI_data:
        return render_template('Food-NF.html')

    return render_template(
        "gi.html",       
        #define GI data in html
        title = GI_data['Food'],
        GI = GI_data['GI'],
        GL = GI_data['GL'],
        Carb = GI_data['Carb']
    )
  
if __name__ == "__main__":
    serve(app, host="0.0.0.0", port =8000)