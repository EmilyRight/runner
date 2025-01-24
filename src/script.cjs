const fs = require("fs");
const path = require("path");
const webp = require("webp-converter");


// function processFiles(folderPath) {
//   // Читаем содержимое папки
//   fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
//       if (err) {
//           console.error(`Ошибка чтения папки: ${folderPath}`, err);
//           return;
//       }

//       files.forEach((file) => {
//           const fullPath = path.join(folderPath, file.name);

//           const normalizedFullPath = fullPath.replace(/\\/g, "/");

//           if (file.isDirectory()) {
//               processFiles(normalizedFullPath);
//           } else if (file.isFile() && /.(png|jpg|jpeg)$/i.test(file.name)) {
//               const outputFilePath = normalizedFullPath.replace(/.(png|jpg|jpeg)$/i, ".webp");
//               convertToWebp(normalizedFullPath, outputFilePath);
//           }
//       });
//   });
// }

// // Функция для конвертации файла в webp
// function convertToWebp(inputPath, outputPath) {
//   const result = webp.cwebp(inputPath, outputPath,"-q 80",logging="-v")
//   result.then((res)=> {
//     console.log(res);
//   })
// }

// // Запуск программы
// const folderToProcess = path.resolve(__dirname, "../src/assets/images/screens/");
// processFiles(folderToProcess);

function processFiles(folderPath, outputFolderPath) {
  // Читаем содержимое текущей папки
  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Ошибка чтения папки: ${folderPath}`, err);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(folderPath, file.name);
      const outputPath = path.join(outputFolderPath, file.name);

      // Нормализация путей (замена "\" на "/")
      const normalizedFullPath = fullPath.replace(/\\/g, "/");
      const normalizedOutputPath = outputPath.replace(/\\/g, "/");

      if (file.isDirectory()) {
        // Создаем директорию в целевой папке
        fs.mkdirSync(normalizedOutputPath, { recursive: true });

        // Рекурсивная обработка вложенной папки
        processFiles(normalizedFullPath, normalizedOutputPath);
      } else if (file.isFile() && /.(png|jpg|jpeg)$/i.test(file.name)) {
        // Если файл — изображение, конвертируем в WebP
        const webpOutputPath = normalizedOutputPath.replace(/.(png|jpg|jpeg)$/i, ".webp");
        convertToWebp(normalizedFullPath, webpOutputPath);
      } else {
        // Если это не изображение, копируем файл как есть
        fs.copyFileSync(fullPath, outputPath);
      }
    });
  });
}

// Функция для конвертации изображения в WebP
function convertToWebp(inputPath, outputPath) {
  const result = webp.cwebp(inputPath, outputPath, "-q 80", logging="-v");
  result.then((res) => {
    console.log(`Конвертация завершена: ${inputPath} -> ${res}`);
  }).catch((err) => {
    console.error(`Ошибка конвертации файла: ${inputPath}`, err);
  });
}

// Указываем исходную папку и целевую папку
const srcFolderPath = path.resolve(__dirname, "../src/assets/images/person/");
const outputFolderPath = path.resolve(__dirname, "../src/assets/images2/person/");

// Создаем целевую папку, если она еще не создана
fs.mkdirSync(outputFolderPath, { recursive: true });

// Запускаем процесс обработки файлов
processFiles(srcFolderPath, outputFolderPath);