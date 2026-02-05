/*
Alignment

| char | char | char | char | char | char | char | char |
|    short    |    short    |    short    |    short    |
|            int            |           float           |
|                         long                          |
|                        double                         |
*/

#include <stdio.h>

struct Example1 {
    int int1;
    short short1;
    char char1;
    char char2;
    char char3;
};

/*
| char |??????|    short    |            int            |
|                         long                          |
|           float           |???????????????????????????|
|                        double                         |
*/
struct Example2 { // 32
    char char1; // 1 byte
    short short1; // 2 bytes
    int int1; // 4 bytes
    long long1; // 8 bytes
    float float1; // 4 bytes
    double double1; // 8 bytes
};

struct Example3 {
    char* char_ptr; // 8 bytes
    short* short_ptr; // 8 bytes
    int* int_ptr; // 8 bytes
    long* long_ptr; // 8 bytes
    float* float_ptr; // 8 bytes
    double* double_ptr; // 8 bytes
};

struct Example4 {
    char char1;
    char char2;
    char char3;
};

typedef struct {
    char* name;
    int age;
    int salary;
    int bonus;
} Person;

int main() {
    printf("%d\n", sizeof(struct Example3));
    printf("%d\n", 6 * 8);
    // printf("%d\n", sizeof(Person));
    return 0;
}
