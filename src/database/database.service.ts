import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private isconnected = false;
  onModuleInit(): void {
    this.isconnected = true;
    console.log('Database is connected...');
  }

  // this is by default not executed by nest js
  // had to tell same for this in main.js
  onApplicationShutdown(signal: string) {
    this.isconnected = false;
    console.log('Database is disconnected...', signal);
  }

  // not lifecycle method
  getStatus() {
    return this.isconnected ? 'connected' : 'Disconnected';
  }
}
