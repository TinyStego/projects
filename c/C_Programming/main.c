#include <stdio.h>

void print_hello(void);
void print_how(void);
void print_are(void);
void print_you(void);

int main(int args, char** argv)
{
  char n;
  while(1)
  {

    printf("Enter Q to quit: ");
    scanf("%c", &n);

    if(n == 'Q')
      break;
    else
    {
      print_hello();
      print_how();
      print_are();
      print_you();
    }
    printf("test");
  }

  return 0;
}

void print_hello(void)
{
  printf("Hello ");
}

void print_how(void)
{
  printf("how ");
}

void print_are(void)
{
  printf("are ");
}

void print_you(void)
{
  printf("you?\n");
}
