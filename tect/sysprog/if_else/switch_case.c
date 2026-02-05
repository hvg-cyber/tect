

#include <stdio.h>

int main() {
    char grade = 'B';

    switch (grade) {
        case 'A':
            printf("Excellent!\n");
            break;
        case 'B':
            printf("Good job!\n");  // This runs
            break;
        case 'C':
            printf("Okay.\n");
            break;
        default:
            printf("Invalid grade.\n");
    }
}
