#include <stdio.h>

int main() {
    int x = 10;
    if (x > 5) {
        printf("x is greater than 5!\n");
    }
    if (x < 0) {
        printf("x is negative.\n");
    } else {
        printf("x is zero or positive.\n");
    }
    return 0;
}
