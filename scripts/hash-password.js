#!/usr/bin/env node

/**
 * Şifre Hash'leme Script'i
 * Kullanım: node scripts/hash-password.js "metod2024!"
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Kullanım: node scripts/hash-password.js "şifreniz"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log('\n✅ Şifre Hash\'lendi:');
console.log(hash);
console.log('\nBu hash\'i MySQL veritabanındaki password alanına yapıştırabilirsiniz.\n');

