#include <stdio.h>
#include <string.h>

int main(int args, char** argv)
{
  char phrase[10], new_phrase[10];
  int i, j, count = 0;

  printf("Enter a string: ");
  fgets(phrase,sizeof(phrase),stdin);

  while(strcmp(&phrase[count], "\0") != 0)
    count ++;
  printf("%d", count);

  for(j = 0, i = count - 1; j < count; j++, i--)
  {
    new_phrase[j] = phrase[i];
  }

  printf("%s", new_phrase);

  return 0;
}
