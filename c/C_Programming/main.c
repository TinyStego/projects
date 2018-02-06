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

  for(i = 0; i < count - 1; i++)
  {
    j = 0;
    while((sentence[i] != ' ') && (sentence[i] != '\0'))
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
