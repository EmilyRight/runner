#!/bin/bash

# Задаем переменные
FOLDER_PATH=$1 # Путь к папке с файлами
DEBUG=$2 # Включить отладку. Пример: ./upload_files.sh /path/to/folder debug

# 	https://static-basket-03.wb.ru/vol51/ads/upload/theact/product-4.png

RENDER_API_URL="${RENDER_API_URL:-http://render-dl.wb.ru/api/v1/upload}" # URL для загрузки файлов с кастомными операциями
RENDER_API_RETURN_URL="${RENDER_API_RETURN_URL:-https://static-basket-02.wbbasket.ru/}" # URL, c которого будут доступны файлы
RENDER_API_TOKEN="${RENDER_API_TOKEN:-eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsa192Yl9wcm9kdml6aGVuaXllIn0.exKRNTez9y0yCba3vSE0JiOzFTVTHxnLAGhf9g33YQs}" # Bearer токен для аутентификации
RENDER_API_TARGET="${RENDER_API_TARGET:-basket-static-vol29}" # Куда будут загружены файлы
RENDER_API_KEY="${RENDER_API_KEY:-landings/}" # Используется в operations/export/key как префикс


# Проверяем, передан ли токен
if [ -z "$RENDER_API_TOKEN" ]; then
    echo "Пожалуйста, укажите токен для аутентификации."
    exit 1
fi

# Проверяем, передан ли путь к папке
if [ -z "$FOLDER_PATH" ]; then
    echo "Пожалуйста, укажите путь к папке."
    exit 1
fi

# Определяем, Linux это или macOS и генерируем дату истечения жизни задания
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    expires_at=$(date -u -d "+1 day" +"%Y-%m-%dT%H:%M:%SZ") # Для Linux
elif [[ "$OSTYPE" == "darwin"* ]]; then
    expires_at=$(date -u -v+1d +"%Y-%m-%dT%H:%M:%SZ") # Для macOS
else
    echo "Неизвестная операционная система. Поддерживаются только Linux и macOS."
    exit 1
fi

# Функция для получения расширения файла
get_file_extension() {
    local file=$1
    echo "${file##*.}"
}

# Функция для получения имени файла с новым расширением
get_file_name() {
    local file=$1
    local new_ext=$2
    local old_ext=$(get_file_extension "$file")

    echo "$(basename "$file" .$old_ext).${new_ext}"
}

# Функция для генерации ключа экспорта с учетом префикса
generate_export_key() {
    local relative_path=${1#$FOLDER_PATH/}
    echo "${RENDER_API_KEY}${relative_path}"
}

generate_file_url() {
    local file=$1
    local ext=$2
    local key=$(generate_export_key "$file" "$ext")
    local additional="vol29/"
    echo "${RENDER_API_RETURN_URL}${additional}${key}"
}

# Функция для загрузки файла
upload_file() {
    local file_path=$1
    request_id=$(uuidgen)
    local file_index=$2
    local export=$3
    local file_ext=$4

    echo " $file_index. Загрузка файла $(get_file_name "$file_path" "$file_ext") с операциями: $operations"

    local task="{
      \"request_id\": \"$request_id\",
      \"expires\": \"$expires_at\",
      \"export\": $export
    }"
    echo $task

    if [ "$DEBUG" == "debug" ]; then
        echo "DEBUG MODE!"
        echo "Запрос:"
        echo "$task"
        echo -e "\n"
    else
        curl -s \
            -H "Authorization: bearer $RENDER_API_TOKEN" \
            -F "task=$task" \
            -F "file=@$(realpath $file_path)" \
            -F media=@"$file_path" \
            $RENDER_API_URL
    fi


    # Пример: https://static-basket-02.wbbasket.ru/vol29/lk-vb-prodbizheniye/test2.jpg
    local file_url=$(generate_file_url "$file_path" "$file_ext")
    echo -e "\nСсылка на файл: $file_url\n" # TODO походу не подтягивается кастомный формат изображения
}

file_index=1  # Начинаем с 1

# Проходим по всем файлам в папке
for file in $(find "$FOLDER_PATH" -type f \( -iname '*.jpg' -o -iname '*.webp' -o -iname '*.png' -o -iname '*.svg' -o -iname '*.gif' \)); do
    # Используем дефолтные операции
    file_ext=$(get_file_extension "$file")

    export=" [{ \"target\": \"$RENDER_API_TARGET\", \"key\": \"$(generate_export_key "$file" "$file_ext")\" }]"

    upload_file "$file" "$file_index" "$export" "$file_ext"
    file_index=$((file_index + 1))  # Увеличиваем индекс
done

echo "Все файлы загружены."
