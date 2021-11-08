export function createCustomNotification(data: any): string {
  return `<div class='notification-wrapper'>
          <div class='header'>
            <div class='title'>
              ${data.title}
            </div>

            <div class='date'>
              ${data.date}
            </div>
          </div>

          <div class='body'>
            <p>${data.text}</p>

            <a href='${data.href}'>
              <p>${data.link}</p>
            </a>
          </div>

          <div class='footer'>
            <p>${data.footer}</p>
          </div>
        </div>`;
}

export function createErrorServerNotification(data: any): string {
  return `<div class='notification-wrapper notification-error'>
          <div class='header'>
            <div class='title'>
              Error: ${data.header.status || '-'}
            </div>

            <div class='url'>
              <span>
                <b>url:</b>
                <a href='${data.footer.url || '-'}'>
                  <p>${data.footer.url || '-'}</p>
                </a>
              </span>
            </div>
          </div>

          <div class='body'>
            <p><b>statusText:</b> ${data.body.statusText || '-'}</p>
            <p><b>message:</b> ${data.body.message || '-'}</p>
          </div>
        </div>`;
}
