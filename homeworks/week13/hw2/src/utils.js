/* eslint-disable no-useless-escape */
export function escape(toOutput) {
  return toOutput.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    // eslint-disable-next-line no-useless-escape
    .replace(/\"/g, '&quot;')
    // eslint-disable-next-line no-useless-escape
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}

export function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
                <div class="card">
        <div class="card-body">
            <h5 class="card-title"><i class="fas fa-user"></i> ${escape(comment.nickname)}</h5>
            <p class="card-text">${escape(comment.content)}</p>
        </div>
    </div>
            `;
  if (isPrepend) {
    container.prepend(html);
  } else {
    container.append(html);
  }
}

export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement);
}
