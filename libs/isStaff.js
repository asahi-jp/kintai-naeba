export default function isStaff() {
  // ここはスタッフを判別しているだけだからグローバルに状態管理したい
    // スタッフがあればセット、なければリダイレクト
    if(sessionStorage.getItem("staffId")) {
      // setStaff({
      //   staffId: sessionStorage.getItem("staffId"),
      //   staffName: sessionStorage.getItem("staffName"),
      // })
      return {
        staffId: sessionStorage.getItem("staffId"),
        staffName: sessionStorage.getItem("staffName"),
      }

    } else {
      // router.push("/")
      return null
    }
}