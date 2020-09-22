package com.politiclyconnect.partyregisty.data;


import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;


//@Value

@Data
public class Person {

    @NotBlank
    String id;

    @NotBlank
    String party;

    @NotBlank
    String firstName;

    @NotBlank
    String lastName;

    @Null
    STATUS status = STATUS.BEFORE_VALIDATION;

    String gender;

    String address;

    String age;

    String family_status;

    String email;

    String phone;

    String zipCode;

    String birthCountry;

    String yearOfAliyah;

    public Person(@NotBlank String id, @NotBlank String party, @NotBlank String firstName, @NotBlank String lastName, @Null STATUS status, String gender, String address, String age, String family_status, String email, String phone, String zipCode, String birthCountry, String yearOfAliyah) {
        this.id = id;
        this.party = party;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = status;
        this.gender = gender;
        this.address = address;
        this.age = age;
        this.family_status = family_status;
        this.email = email;
        this.phone = phone;
        this.zipCode = zipCode;
        this.birthCountry = birthCountry;
        this.yearOfAliyah = yearOfAliyah;
    }

/*    public Person(String s, String s1, String s2, String s3, STATUS success, String s4, String s5, String s6, String s7, String s8, String s9, String s10, String s11, String s12) {
        id = s;
    }*/

    @Override
    public String toString() {
        return id + "," + party + "," + firstName + "," + lastName + "," + status.toString() + "," + gender + "," + address + "," + age + "," + family_status + "," + email + "," + phone + "," + zipCode + "," + birthCountry + "," + yearOfAliyah;
    }
}

