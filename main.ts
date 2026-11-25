// Tiny stack VM (ISA.md). T: per opcode, char-48 = imm*16+pops*4+pushes; ' ' = unknown.
import{mkdirSync as m,readdirSync as r,readFileSync as f,writeFileSync as w}from'fs'
let[,,I='/input',O='/output']=process.argv,T='0Aq46:;?        999999959995999 999             PTTP0           58              4414',
R=(p,q,o)=>{let n=p.length,D=new Int32Array(257),C=[],M=new Int32Array(256),s=0,c=0,k=0,i=0,y,v,j,a,b,t
for(;;){if(k++==1e6)return 10
if(!(c in p))return 9
v=T.charCodeAt(y=p[c])-48
if(!(v>=0))return 5
j=v>>4;t=v>>2&3
if(c+j>=n)return 9
if(s<t)return 2
if(s-t+(v&3)>256)return 3
c+=1+j;b=D[s-1];a=D[s-2]
switch(y){case 0:return 0
case 1:D[s++]=p[c-1]<<24>>24;break
case 2:D[s++]=p.readInt32LE(c-4);break
case 3:s--;break
case 4:D[s++]=b;break
case 5:D[s-1]=a;D[s-2]=b;break
case 6:D[s++]=a;break
case 7:t=D[s-3];D[s-3]=a;D[s-2]=b;D[s-1]=t;break
case 23:D[s-1]=-b;break
case 27:D[s-1]=~b;break
case 49:case 50:if(!b==(y&1))c+=p.readInt16LE(c-2);s--;break
case 48:c+=p.readInt16LE(c-2);break
case 51:if(C.length>63)return 7;C.push(c);c=p.readUInt16LE(c-2);break
case 52:if(!C.length)return 8;c=C.pop();break
case 64:if(b>>>0>255)return 6;D[s-1]=M[b];break
case 65:if(b>>>0>255)return 6;M[b]=a;s-=2;break
case 80:t=''+b;if(o.length+t.length>65536)return 11;s--;for(t of t)o.push(t.charCodeAt());break
case 81:if(o.length>65535)return 11;s--;o.push(b&255);break
case 82:D[s++]=q[i++]??-1;break
case 83:return b&255
default:if(y>18&y<23&&!b)return 4
D[--s-1]=[a+b,a-b,Math.imul(a,b),a/b,a%b,(a>>>0)/(b>>>0),(a>>>0)%(b>>>0),,a&b,a|b,a^b,,a<<b,a>>b,a>>>b,,a==b,a<b,a>>>0<b>>>0][y-16]}}}
for(let d of r(I)){let o=[],e=R(f(`${I}/${d}/program.bin`),f(`${I}/${d}/input.bin`),o),P=`${O}/${d}/`
m(P,{recursive:true});w(P+'stdout.bin',Buffer.from(o));w(P+'exit.txt',''+e)}
