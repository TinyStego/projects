#include <stdio.h>

int main(int args, char** argv)
{
  int height, spaces, stars, i, j;

  printf("Enter height of triangle: ");
  scanf("%d", &height);

  for(i = height, spaces = height - 1, stars = 1; i > 0; i--, spaces--, stars += 2)
  {
    for(j = 0; j < spaces; j++)
      printf(" ");
    for(j = 0; j < stars; j++)
      printf("*");
    printf("\n");
  }

  return 0;
}
