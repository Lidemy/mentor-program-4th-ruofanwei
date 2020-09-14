export const cssTemplate = `
@import url('https://fonts.googleapis.com/css?family=Nunito:600,700&display=swap');
* {font-family: 'Nunito', 微軟正黑體;}
.card {margin-top: 12px; } 
.totop {
  position: fixed;
  bottom: 3px;
  right: 20px;}
a,
a:visited {
  display: block;
  margin: 10px 0;}
.loadMore {
  margin: 10px 0px;}
.navbar {
  background-color: #84a9ac;
  height: 60px;
  color: #ffc93c;
  font-weight: bold;
  font-size: 24px;}
.container {
  margin-top: 30px;
  background-color: #84a9ac;}
body {
  background-color: #84a9ac;}
.card-title {
  color: #eebb4d;}
.card-text {
  color: #96bb7c;}
.card {
  background-color: #f3f3f3;}
.nickname,
.content {
  color: #595238;}

    `;


export function getForm(formClassName, commentsClassName) {
  return `
<div>
  <form class="${formClassName}">
     <div class="form-group">
      <label class="nickname">暱稱</label>
      <input name="nickname" type="text" class="form-control">
     </div>
  <div class="form-group">
     <label class="content">留言內容</label>
     <textarea name="content" type="text" class="form-control" rows="3"></textarea>
  </div>
     <button type="submit" class="btn btn-info">Submit</button>
 </form>
     <div class="${commentsClassName}">
    </div>
    </div>
`;
}
export function getLoadMoreButton(loadMoreClassName) {
  return `<button class="${loadMoreClassName} btn loadMore btn-info">Load More</button>`;
}
