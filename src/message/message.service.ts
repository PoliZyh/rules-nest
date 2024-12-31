import { Injectable } from '@nestjs/common';
import * as tencentcloud from "tencentcloud-sdk-nodejs"
import { ConfigService } from '@nestjs/config';

const smsClient = tencentcloud.sms.v20210111.Client

@Injectable()
export class MessageService {

    constructor(
        private readonly configService: ConfigService,
    ) {}
    // 发送短信验证码
    async sendMessage(code: string, phone: string) {
        // 配置
        const client = new smsClient({
            credential: {
                secretId: this.configService.get('TENCENTCLOUD_SECRET_ID'),
                secretKey: this.configService.get('TENCENTCLOUD_SECRET_KEY')
            },
            region: 'ap-beijing',
            profile: {
                httpProfile: {
                    reqMethod: "POST",
                    reqTimeout: 60,
                    endpoint: "sms.tencentcloudapi.com"
                }
            }
        })

        // 参数
        const params = {
            SmsSdkAppId: this.configService.get('SMS_APP_ID'),
            SignName: "腾讯云",
            TemplateId: this.configService.get('TEMPLATE_ID'),
            TemplateParamSet:[code],
            PhoneNumberSet: [`+86${phone}`],
        }

        const res = await client.SendSms(params, function(err, response) {
            if (err) { 
                console.log('err', err)
             }
            console.log('response', response)
        })

        console.log('res', res)
    }

}

