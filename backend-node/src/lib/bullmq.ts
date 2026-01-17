import {Queue} from 'bullmq';
import env from '../config/env.ts';

const connection = {
    host: env.REDIS_HOST || 'localhost',
    port: parseInt(env.REDIS_PORT?.toString() || '6379'),
};

export const pdfQueue = new Queue('pdfQueue', { connection });

console.log('✅BullMQ PDF Queue initialized');