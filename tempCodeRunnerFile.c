#include <assert.h>
#include <ctype.h>
#include <limits.h>
#include <math.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* readline();



/*
 * Complete the 'getMinimumAlterations' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING server_health as parameter.
 */

int getMinimumAlterations(char* server_health) {
    
    assert(server_health != NULL); // Basic assertion
    
    size_t n = strlen(server_health);
    size_t flips_to_zeros = 0;
    size_t flips_to_ones = 0;
    size_t flips_zero_one = INT_MAX;
    size_t flips_one_zero = INT_MAX;
    
    // Flips to *all* '0'-s & *all* '1'-s
    for (size_t i = 0; i < n; i++) {
        
        if (server_health[i] == '1') {
            
            flips_to_zeros++; // Last modification for optimize runtime
        
        } else {
            
            flips_to_ones++;
        
        }
    
    }
    
    // Flips to all '0's then '1'-s
    //OPTIMIZED 

    size_t left_flips_zero_one = 0; // OPTIMIZED
    size_t right_flips_zero_one = 0; // OPTIMIZED
    for (size_t i = 0; i < n; i++) {
        
        if (server_health[i] == '0') {
            
            right_flips_zero_one++;
        
        }        
    }
    
    for (size_t i = 0; i <= n; i++) {
        
        size_t flips = left_flips_zero_one + (right_flips_zero_one - left_flips_zero_one);
        if (flips < flips_zero_one) {
                
                flips_zero_one = flips;
            
        }
        
        if (i < n && server_health[i] == '1') {
            
            left_flips_zero_one++;
        
        } else if (i < n && server_health[i] == '0') {
            
            right_flips_zero_one--;
            
        }
    
    }        
    
    
    // Flips to all '1's then '0'-s
    
    size_t left_flips_one_zero = 0; // Initial left flips (OPTIMIZED)
    size_t right_flips_one_zero = 0; // Initial right flips (OPTIMIZED)

    for (size_t i = 0; i < n; i++) {
        
        if (server_health[i] == '1') {
            
            right_flips_one_zero++;
        
        }
    
    }    

    for (size_t i = 0; i <= n; i++) {
        
        // original
        // size_t flips = 0
        
        size_t flips = left_flips_one_zero + (n - i - (flips_to_ones - left_flips_one_zero)); // OPTIMIZED
        
        if (flips < flips_one_zero) {
                
            flips_one_zero = flips;
            
        }
        
        if (i < n && server_health[i] == '0') {
            
            left_flips_one_zero++;
            
        } else if (i < n && server_health[i] == '1') {
            
            right_flips_one_zero--;
            
        }
        
    }
    
    // Return to minimum
    size_t min_flips = flips_to_zeros;
    
    if (flips_to_ones < min_flips) {
        
        min_flips = flips_to_ones;
    
    } 
    
    if (flips_zero_one < min_flips) {
        
        min_flips = flips_zero_one;
    
    }
    
    if (flips_one_zero < min_flips) {
        
        min_flips = flips_one_zero;
    
    }  
    
    return (int)min_flips;  

}

int main()
{
    FILE* fptr = fopen(getenv("OUTPUT_PATH"), "w");

    char* server_health = readline();

    int result = getMinimumAlterations(server_health);

    fprintf(fptr, "%d\n", result);

    fclose(fptr);

    return 0;
}

char* readline() {
    size_t alloc_length = 1024;
    size_t data_length = 0;

    char* data = malloc(alloc_length);

    while (true) {
        char* cursor = data + data_length;
        char* line = fgets(cursor, alloc_length - data_length, stdin);

        if (!line) {
            break;
        }

        data_length += strlen(cursor);

        if (data_length < alloc_length - 1 || data[data_length - 1] == '\n') {
            break;
        }

        alloc_length <<= 1;

        data = realloc(data, alloc_length);

        if (!data) {
            data = '\0';

            break;
        }
    }

    if (data[data_length - 1] == '\n') {
        data[data_length - 1] = '\0';

        data = realloc(data, data_length);

        if (!data) {
            data = '\0';
        }
    } else {
        data = realloc(data, data_length + 1);

        if (!data) {
            data = '\0';
        } else {
            data[data_length] = '\0';
        }
    }

    return data;
}
