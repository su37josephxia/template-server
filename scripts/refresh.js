const axios = require('axios')

// 从环境变量中获取token
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODJkYjhlZDM1OTU1NWVjNzJhNDVjZiIsImlhdCI6MTY4NjUzOTY3NCwiZXhwIjoxNjg3MTg3Njc0fQ.hrS4b0Vb7zgN7Jm7ws3ZySIwtgNKjYqMAQ6vYdTnY_8`;

// 设置请求头
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const host = 'http://template.codebus.tech/'


// 构造请求体数据
async function refresh(id) {
    const data = {
        id
    };

    let res = await axios.get(host + `api/web/content/get?id=${id}`, data, config)



    // 发送POST请求
    // 
    if (res.data.result) {
        console.log('res:', id, res.data.result.publish, res.data.result.thumbnail)

        // res = await axios.post(host + 'api/web/content/unpublish', data, config)
    } else {
        // console.log('nno', id)
    }

}
setTimeout(
    async () => {
        for (let i = 1; i < 230; i++) {
            await refresh(i)
        }
    }
)


