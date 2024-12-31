import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message/message.service';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    // 自定义用户模块
    UserModule,
    // 数据库
    TypeOrmModule.forRoot({
      type: "mysql", //数据库类型
      username: "root", //账号
      password: "zyh021018", //密码
      host: "localhost", //host
      port: 3306, //
      database: "rules", //库名
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize:true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay:500, //重试连接数据库间隔
      retryAttempts:10,//重试连接数据库的次数
      autoLoadEntities:true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    // 全局配置env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MessageModule,
    GeneralModule
  ],
  controllers: [AppController],
  providers: [AppService, MessageService],
})
export class AppModule {}
