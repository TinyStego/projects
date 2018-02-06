#include <stdio.h>

int main(int args, char** argv)
{
  int height, rows, j;

  printf("Enter height of triangle: ");
  scanf("%d", &height);

  for(rows = 0; rows < 2 * height - 1; rows++)
  {
    if(rows <= height - 1)
    {
      for(j = 0; j <= rows; j++)
        printf("*");
    }
    else
    {
      for(j = 1; j < 2 * height - rows; j++)
        printf("*");
    }
    printf("\n");
  }

  return 0;
}
