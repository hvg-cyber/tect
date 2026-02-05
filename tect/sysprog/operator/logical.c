

#include <stdio.h>

int main() {
    int age = 70;
    int hasLicense = 1;

    if (age >= 16 && hasLicense) {
        printf("You can drive!\n");
    }

    if (age < 13 || age > 65) {
        printf("Discount available.\n");
    }

    return 0;
}
