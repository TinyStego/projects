#include <stdio.h>

int main(int args, char** argv)
{
  int num, i, j;

  printf("Enter number of lines: ");
  scanf("%d", &num);

  for(i = 0; i < num; i++)
  {
    for(j = 0; j <= i; j++)
    {
      printf("*");
    }
    printf("\n");
  }
  return 0;
}
