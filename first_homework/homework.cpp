#include<iostream>
#include<stdlib.h>

int main(int argc, char *argv[])
{
  int num[2];

  for(int i=1; i<argc;i++)
  {
    num[i-1] = atoi(argv[i]);
  }
  int result = num[0]+num[1];
  std::cout<<result<<std::endl;

  return result;
}
