import { expect } from '@playwright/test';

class LoginPage {
  page: any;

  constructor(page) {
    this.page = page;
    this.page.on('response', this.handleResponse.bind(this));
  }

  async handleResponse(response) {
    expect.soft(response.status()).toBe(200); // 软断言，此处只做记录，不会中断测试
    if (response.status() !== 200) {
      console.log(`请求 URL: ${response.url()}, 状态码: ${response.status()}`);
    }
  }

  async login(username, password) {
    await this.page.goto('https://panjiachen.github.io/vue-element-admin/#/login');
    await this.page.getByPlaceholder('账号').click();
    await this.page.getByPlaceholder('账号').fill(username);
    await this.page.getByPlaceholder('账号').press('Tab');
    await this.page.getByPlaceholder('密码').fill(password);
    await this.page.getByRole('button', { name: '登录' }).click();
  }
}

export class AdminLoginPage extends LoginPage {
  async login() {
    await super.login('admin', '111111');
  }
}

export class VisitorLoginPage extends LoginPage {
  async login() {
    await super.login('visitor', '123456');
  }
}


// export async function adminLogin(page) {
//     await page.goto('https://panjiachen.github.io/vue-element-admin/#/login');
//     await page.getByPlaceholder('账号').click();
//     await page.getByPlaceholder('账号').fill('admin');
//     await page.getByPlaceholder('账号').press('Tab');
//     await page.getByPlaceholder('密码').fill('111111');
//     await page.getByRole('button', { name: '登录' }).click();
// };

// export async function visitorLogin(page) {
//     await page.goto('https://panjiachen.github.io/vue-element-admin/#/login');
//     await page.getByPlaceholder('账号').click();
//     await page.getByPlaceholder('账号').fill('visitor');
//     await page.getByPlaceholder('账号').press('Tab');
//     await page.getByPlaceholder('密码').fill('111111');
//     await page.getByRole('button', { name: '登录' }).click();
// };