Console.WriteLine("_________________Tabuada_________________");

Console.Write("Insira um número: ");
int num1 = Convert.ToInt32(Console.ReadLine());

Console.Write("Insira outro número: ");
int num2 = Convert.ToInt32(Console.ReadLine());

int maiorNumero = num1 > num2 ? num1 : num2;
int menorNumero = num1 < num2 ? num1 : num2;

Console.WriteLine($"Maior número {maiorNumero}");
Console.WriteLine($"Menor número {menorNumero}");

for (int i = menorNumero; i <= maiorNumero; i++)
{
    Console.WriteLine("-------------------------------------");

    for (int j = 0; j <= 10; j++)
    {
        Console.WriteLine($"{i} x {j} = {i * j}");
    }
}

Console.WriteLine("_________________________________________");