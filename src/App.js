
import axios from 'axios';
import { useEffect, useState } from 'react';
import './assets/main.scss'
import ArticleCard from './components/card';
function App() {

  
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNiYmEzYTY4ZDQ0ZWZlMmQ2YmJiNDIiLCJpYXQiOjE3MzEwNjE2NDksImV4cCI6MTczMzY1MzY0OX0.LCZsxHqzXDhs_1gHJljJCv51l5O6EneBnIitbkUepa4';

  const apiUrl = 'https://api.protool.uz/v1/articles';

  const [data, setData] = useState()

  const getAllArticles = () => {
    axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response?.data?.data);
        setData(response?.data?.data)
      })
      .catch(error => {
        console.error("Error while getting all articles:", error);
      });
  };

  useEffect(() => {
    getAllArticles()
  }, [])

  return (
    <div className="articles-cards">
      {
        data?.map((item, key) => (
          <ArticleCard update={getAllArticles} data={item} />
        ))
      }
    </div>
  );
}

export default App;


// GET (GET ALL)=> MALUMOTLARNI OLISH

// GET BY ID GET/ID AYNAN BITTA MAHSULOTNI MALUMOTI OLISH

// POST => MALUMOTNI YARATAMIZ CREATE QILAMIZ

// DELETE => MALUMOTNI O'CHIRAMIZ UDALIT QILAMIZ

// PUT/PATCH => MALUMOTNI EDIT QILAMIZ/ TAHRIRLAYMIZ

