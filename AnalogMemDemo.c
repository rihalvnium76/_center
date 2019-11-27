#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <limits.h>
#define C2i(c_ptr) *((int32_t*)c_ptr)
int32_t c2i(const char *c){
	return *((int32_t*)c);
}
int main()
{
	char a[8]={1,2,3,4,5,6,7,8};
	printf("%x %x\n",sizeof(a),UCHAR_MAX);
	for(int i=0;i<8;++i)printf("%x ",a[i]);
	puts("");

	int32_t b,c;
	memcpy(&b,&a[0],4);
	memcpy(&c,&a[4],4);
	printf("%x %x\n",b,c);

	printf("%x %x\n",c2i(&a[0]),c2i(&a[4]));
	printf("%x %x\n",C2i(&a[0]),C2i(&a[4])); // ditto
   return 0;
}
