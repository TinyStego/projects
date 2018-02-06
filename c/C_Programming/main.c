#include <stdio.h>
#include <string.h>

int main(int args, char** argv)
{
  char sentence[100];
  char word[50];
  int i, j, count = 0;

  printf("Enter a sentence: ");
  fgets(sentence, sizeof(sentence), stdin);

  while(sentence[count] != '\0')
    count++;

  printf("%d\n", count);
  printf("%c\n", sentence[count - 2]);
  for(i = 0; i < count - 2; i++)
  {
    j = 0;
    while(sentence[i] != ' ')
    {
      word[j] = sentence[i];
      i++;
      j++;
    }
    word[j] = '\0';
    printf("%s\n", word);
  }


  return 0;
}
