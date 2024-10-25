import { fetchUtils } from 'react-admin';
import { BASE_URL } from '../constants';

const apiUrl = `${BASE_URL}/freelancers`;
const httpClient = fetchUtils.fetchJson;

const usersProvider = {
    getList: async (resource, params) => {
        try {
            const jwt = sessionStorage.getItem('jwt');
            const options = {
                headers: new Headers({
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                })
            };

            const { json } = await httpClient(apiUrl, options);
            let filteredData = json.data;

            // Фильтрация по поисковому запросу
            if (params.filter.q) {
                const query = params.filter.q.toLowerCase();
                filteredData = filteredData.filter(item =>
                    item.attributes.position?.toLowerCase().includes(query) ||
                    item.attributes.username?.toLowerCase().includes(query) ||
                    item.attributes.email?.toLowerCase().includes(query)
                );
            }

            // Фильтрация по выбранному фрилансеру
            if (params.filter.freelancers) {
                const selectedFreelancerId = params.filter.freelancers;
                filteredData = filteredData.filter(item =>
                    item.id.toString() === selectedFreelancerId
                );
            }

            // Сортировка
            const { field = 'id', order = 'ASC' } = params.sort || { field: 'id', order: 'ASC' };

            // Функция для безопасного доступа к вложенному полю объекта
            function getNestedValue(obj, path) {
                return path.split('.').reduce((acc, part) => acc && acc[part], obj);
            }

            const sortedData = filteredData.sort((a, b) => {
                // Используем функцию для получения значений
                const aValue = getNestedValue(a, field) || '';  // Убедитесь, что поле существует
                const bValue = getNestedValue(b, field) || '';

                // Приведение к строке для корректного сравнения строк
                const aVal = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
                const bVal = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;

                // Логика сортировки
                if (aVal > bVal) {
                    return order === 'ASC' ? 1 : -1;
                }
                if (aVal < bVal) {
                    return order === 'ASC' ? -1 : 1;
                }
                return 0;
            });

            // Пагинация
            const { page = 1, perPage = 10 } = params.pagination || {};
            const paginatedData = sortedData.slice((page - 1) * perPage, page * perPage);

            return {
                data: paginatedData,
                total: filteredData.length
            };
        } catch (error) {
            console.error('Error fetching freelancers:', error);
            return { data: [], total: 0 };
        }
    },
};

export default usersProvider;

