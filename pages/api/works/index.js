export default async function handler(req, res) {

  if(req.method === "GET") {
    console.log("get")
    res.status(200).json({ message: '定義されていないエンドポイントです' })
  }

  // POSTリクエスト
  if(req.method === "POST") {
    const result = await fetch(`${process.env.GAS_URL}?postType=addWork`, {
      method: 'POST',
      body: req.body,
    })
    // GASでエラーが起きた場合htmlが返ってくる
    
    const data = await result.json()

    // レスポンスをそのまま返す
    res.status(200).json(data)
  }
}