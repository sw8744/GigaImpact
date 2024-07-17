from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os
import dotenv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

dotenv.load_dotenv()

conn = psycopg2.connect(
    host=os.getenv('DB_HOST'),
    database=os.getenv('DB_DATABASE'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD')
)

print("Database connected")

@app.post("/api/register")
def register_user(user):
    cur = conn.cursor()
    cur.execute("INSERT INTO gigaimpact.users (id, password, name, nickname, description, birthday, location, category, howmanystudy, job, point) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (user["id"], user["password"], user["name"], user["nickname"], user["description"], user["birthday"], user["location"], user["category"], user["howmanystudy"], user["job"], 0))
    conn.commit()
    cur.close()
    return {"status": "success"}

@app.post("/api/login")
def register_user(auth):
    cur = conn.cursor()
    cur.execute("SELECT * FROM gigaimpact.users WHERE name = %s AND nickname = %s", (auth["id"], auth["password"]))
    res = cur.fetchall()
    cur.close()
    if len(res) == 0:
        raise HTTPException(status_code=404, detail="ID is incorrect")
    elif res[0][10] != auth["password"]:
        raise HTTPException(status_code=400, detail="Password is incorrect")
    else:
        raise HTTPException(status_code=200, detail="Login success")
    return {"status": "success"}

@app.get("/api/userbyid/{id}")
def get_user(id):
    cur = conn.cursor()
    cur.execute("SELECT * FROM gigaimpact.users WHERE id = %s", (id,))
    user = cur.fetchone()
    cur.close()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": user[0],
        "password": user[10],
        "name": user[1],
        "nickname": user[2],
        "description": user[3],
        "birthday": user[4],
        "location": user[5],
        "category": user[6],
        "howmanystudy": user[7],
        "job": user[8],
        "point": user[9]
    }

@app.get("/api/post")
def get_posts():
    cur = conn.cursor()
    cur.execute("SELECT * FROM gigaimpact.posts ORDER BY id DESC")
    posts = cur.fetchall()
    cur.execute("SELECT * FROM gigaimpact.users")
    users = cur.fetchall()
    users_final = {}
    for user in users:
        users_final[user[0]] = {
            "name": user[1],
            "nickname": user[2]
        }
    cur.close()
    res = []
    for post in posts:
        res.append({
            "id": post[0],
            "author": users_final[post[1]]["nickname"],
            "write_date": post[2],
            "category": post[3],
            "title": post[4],
            "content": post[5],
            "point": post[6],
            "isSolved": post[7]
        })

    return res

@app.get("/api/postbyid/{id}")
def get_post(id):
    id_int = int(id)
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM gigaimpact.posts WHERE id=%s", (id_int,))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail="Post not found")
    posts = cur.fetchall()
    try:
        cur.execute("SELECT * FROM gigaimpact.users WHERE id=%s", (posts[0][1],))
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail="User not found")

    users = cur.fetchall()
    users_final = {}
    for user in users:
        users_final[user[0]] = {
            "name": user[1],
            "nickname": user[2]
        }
    cur.close()
    res = []
    for post in posts:
        res.append({
            "id": post[0],
            "author": users_final[post[1]]["nickname"],
            "write_date": post[2],
            "category": post[3],
            "title": post[4],
            "content": post[5],
            "point": post[6],
            "isSolved": post[7]
        })

    return res[0]

@app.get("/api/user")
def get_user():
    cur = conn.cursor()
    cur.execute("SELECT * FROM gigaimpact.users")
    users = cur.fetchall()
    cur.close()
    res = []
    for user in users:
        res.append({
            "id": user[0],
            "name": user[1],
            "nickname": user[2],
            "description": user[3],
            "birthday": user[4],
            "location": user[5],
            "category": user[6],
            "howmanystudy": user[7],
            "job": user[8],
            "point": user[9],
            "reputation": user[10]
        })

    return res

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=2000)
