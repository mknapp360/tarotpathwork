const { cpSync, mkdirSync } = require('fs')
try { mkdirSync('dist', { recursive: true }) } catch {}
cpSync('public/robots.txt', 'dist/robots.txt')
console.log('robots.txt copied')