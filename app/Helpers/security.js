import AES from 'crypto-js/aes'
import enc from 'crypto-js/enc-utf8'

var salt = "VCHsecure!@#2020"
var salt2 = "87e1tsv6e27t8y15b49"

export function makeSecureEncrypt(o) {
  o = JSON.stringify(o).split('')
  for (var i = 0, l = o.length; i < l; i++)
    if (o[i] == '{')
      o[i] = '}'
    else if (o[i] == '}')
      o[i] = '{'

  return AES.encrypt(encodeURI(salt + o.join('')), salt2)
}

export function makeSecureDecrypt(o) {
  o = AES.decrypt(o.toString(), salt2)
  o = o.toString(enc)
  o = decodeURI(o)
  if (salt && o.indexOf(salt) != 0)
    return false
  o = o.substring(salt.length).split('')
  for (var i = 0, l = o.length; i < l; i++)
    if (o[i] == '{')
      o[i] = '}'
    else if (o[i] == '}')
      o[i] = '{'

  return JSON.parse(o.join(''))
}
