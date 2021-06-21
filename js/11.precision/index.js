/**
 * 深入浮点精度数
 * 
 * js中的Number类型使用IEEE754标准来表示整数和浮点数值
 * 在IEEE754中，规定了四种表示浮点数值的方式，单精度(32位)，双精度(64位)，延伸单精度与延伸双精度
 * js采用的就是双精度，也就是说使用64个字节来存储一个数字
 */

/*
 浮点数转二进制
 1020 = 1 * 2^9 + 1 * 2^8 + 1 * 2^7 + 1 * 2^6 + 1 * 2^5 + 1 * 2^4 + 1 * 2^3 + 1 * 2^2 + 0 * 2^1 + 0 * 2^0
 0.75 = 0.11
 0.1 = -.0001100110011...

 浮点数的存储
 一个浮点数可以这样表示

 非二进制的浮点数表示法：Value = sign * exponent * fraction
                              1位  11位       52位
 -1020 = -1 * 10^3 * 1.02

 二进制的浮点数表示法：Value = (-1)^S * (1 + Fraction) * 2^E




0.1 = 1 * 2^-4 * 1.10011001100...

 */
