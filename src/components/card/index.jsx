import axios from "axios";
import { Modal, Input, Button } from "antd";

import { useState } from "react";


const ArticleCard = ({ data, update }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNiYmEzYTY4ZDQ0ZWZlMmQ2YmJiNDIiLCJpYXQiOjE3MzEwNjE2NDksImV4cCI6MTczMzY1MzY0OX0.LCZsxHqzXDhs_1gHJljJCv51l5O6EneBnIitbkUepa4';

    const apiUrl = 'https://api.protool.uz/v1/articles';

    const deleteArticle = (id) => {
        axios.delete(`${apiUrl}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                update()
            })
            .catch(error => {
                console.error("Error while deleting the article:", error);
            });
    };

    const [title, setTitle] = useState()
    const [cardImage, setCardImage] = useState("https://res.cloudinary.com/dtvw0l3sx/image/upload/v1698496148/20231028172907498.jpg")
    const [body, setBody] = useState()
    const [author, setAuthor] = useState()
    const [excerpt, setExcerpt] = useState()

    const updateArticle = (e, id) => {
        e.preventDefault()

        const updatedArticle = {
            title: title,
            cardImage: cardImage,
            body: body,
            author: author,
            excerpt: excerpt
        };

        axios.put(`${apiUrl}/${id}`, updatedArticle, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(response.data);
                handleCancel()
                update()
            })
            .catch(error => {
                console.error("Error while updating the article:", error);
            });
    };

    return (
        <>
            <div className="article-card">
                <img src={data?.cardImage} alt="" />
                <h1>{data?.title}</h1>
                <button onClick={() => deleteArticle(data?._id)}>Delete</button>
                <Button type="primary" onClick={showModal}>
                    Edit
                </Button>
            </div>


            <Modal footer={false} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <h1>{data?.title}</h1>

                <form onSubmit={(e) => updateArticle(e, data?._id)}>
                    <Input
                        defaultValue={data?.title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        style={{ marginBottom: "10px" }}
                    />
                    <Input
                        defaultValue={data?.author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Author"
                        style={{ marginBottom: "10px" }}
                    />
                    <Input
                        defaultValue={data?.body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Body"
                        style={{ marginBottom: "10px" }}
                    />
                    <Input
                        defaultValue={data?.excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Excerpt"
                        style={{ marginBottom: "10px" }}
                    />
                    <Button type="primary" htmlType="submit" onClick={handleCancel}>
                        Submit
                    </Button>
                </form>
            </Modal>
        </>
    )
}

export default ArticleCard