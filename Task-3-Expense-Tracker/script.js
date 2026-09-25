/* =========================================================
   FINTRACK — PROFESSIONAL EXPENSE TRACKER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    const transactionForm = document.getElementById("transactionForm");

    const transactionTitle =
        document.getElementById("transactionTitle");

    const transactionAmount =
        document.getElementById("transactionAmount");

    const transactionCategory =
        document.getElementById("transactionCategory");

    const transactionDate =
        document.getElementById("transactionDate");

    const transactionDescription =
        document.getElementById("transactionDescription");

    const expenseTypeBtn =
        document.getElementById("expenseTypeBtn");

    const incomeTypeBtn =
        document.getElementById("incomeTypeBtn");

    const transactionList =
        document.getElementById("transactionList");

    const emptyState =
        document.getElementById("emptyState");

    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const themeBtn =
        document.getElementById("themeBtn");

    const currentDate =
        document.getElementById("currentDate");

    const totalBalance =
        document.getElementById("totalBalance");

    const totalIncome =
        document.getElementById("totalIncome");

    const totalExpense =
        document.getElementById("totalExpense");

    const netSavings =
        document.getElementById("netSavings");

    const balanceStatus =
        document.getElementById("balanceStatus");

    const savingsStatus =
        document.getElementById("savingsStatus");

    const donutChart =
        document.getElementById("donutChart");

    const chartTotal =
        document.getElementById("chartTotal");

    const categoryLegend =
        document.getElementById("categoryLegend");

    const transactionCount =
        document.getElementById("transactionCount");

    const totalTransactionsInsight =
        document.getElementById("totalTransactionsInsight");

    const topCategory =
        document.getElementById("topCategory");

    const averageExpense =
        document.getElementById("averageExpense");

    const editModal =
        document.getElementById("editModal");

    const closeEditModal =
        document.getElementById("closeEditModal");

    const editForm =
        document.getElementById("editForm");

    const editTransactionId =
        document.getElementById("editTransactionId");

    const editTitle =
        document.getElementById("editTitle");

    const editAmount =
        document.getElementById("editAmount");

    const editCategory =
        document.getElementById("editCategory");

    const editDate =
        document.getElementById("editDate");

    const editDescription =
        document.getElementById("editDescription");

    const cancelEdit =
        document.getElementById("cancelEdit");

    const deleteModal =
        document.getElementById("deleteModal");

    const cancelDelete =
        document.getElementById("cancelDelete");

    const confirmDelete =
        document.getElementById("confirmDelete");

    const toast =
        document.getElementById("toast");

    const toastIcon =
        document.getElementById("toastIcon");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const closeToast =
        document.getElementById("closeToast");

    const quickExpenseBtn =
        document.getElementById("quickExpenseBtn");

    const quickIncomeBtn =
        document.getElementById("quickIncomeBtn");

    const emptyAddBtn =
        document.getElementById("emptyAddBtn");


    /* =====================================================
       APPLICATION STATE
       ===================================================== */

    let transactions = [];

    let selectedType = "expense";

    let selectedFilter = "all";

    let transactionToDelete = null;

    let toastTimer = null;


    const STORAGE_KEY =
        "fintrack_professional_transactions_v2";

    const THEME_KEY =
        "fintrack_professional_theme_v2";


    /* =====================================================
       CATEGORY ICONS
       ===================================================== */

    const categoryIcons = {

        Food: "fa-utensils",

        Transport: "fa-car",

        Shopping: "fa-bag-shopping",

        Bills: "fa-file-invoice-dollar",

        Education: "fa-graduation-cap",

        Health: "fa-heart-pulse",

        Entertainment: "fa-film",

        Salary: "fa-money-bill-wave",

        Freelance: "fa-laptop-code",

        Investment: "fa-chart-line",

        Other: "fa-layer-group"

    };


    /* =====================================================
       CATEGORY COLORS
       ===================================================== */

    const categoryColors = {

        Food: "#ff6b6b",

        Transport: "#4dabf7",

        Shopping: "#845ef7",

        Bills: "#f59f00",

        Education: "#20c997",

        Health: "#f06595",

        Entertainment: "#7950f2",

        Salary: "#12b76a",

        Freelance: "#0ea5e9",

        Investment: "#14b8a6",

        Other: "#94a3b8"

    };


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    init();


    function init() {

        loadTransactions();

        loadTheme();

        setCurrentDate();

        setDefaultDate();

        renderApp();

        setupKeyboardShortcuts();

    }


    /* =====================================================
       DATE FUNCTIONS
       ===================================================== */

    function getLocalDateString(date = new Date()) {

        const year = date.getFullYear();

        const month =
            String(date.getMonth() + 1).padStart(2, "0");

        const day =
            String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }


    function setDefaultDate() {

        if (!transactionDate.value) {

            transactionDate.value =
                getLocalDateString();

        }

    }


    function setCurrentDate() {

        const now = new Date();

        currentDate.textContent =
            now.toLocaleDateString("en-IN", {

                weekday: "short",

                day: "numeric",

                month: "short",

                year: "numeric"

            });

    }


    function formatDate(dateString) {

        if (!dateString) {
            return "No date";
        }

        const parts =
            dateString.split("-");

        if (parts.length !== 3) {
            return dateString;
        }

        const date =
            new Date(
                Number(parts[0]),
                Number(parts[1]) - 1,
                Number(parts[2])
            );

        return date.toLocaleDateString("en-IN", {

            day: "2-digit",

            month: "short",

            year: "numeric"

        });

    }


    /* =====================================================
       MONEY FORMAT
       ===================================================== */

    function formatMoney(amount) {

        return Number(amount || 0).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    }


    /* =====================================================
       LOAD / SAVE LOCAL STORAGE
       ===================================================== */

    function loadTransactions() {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);

            if (saved) {

                const parsed =
                    JSON.parse(saved);

                if (Array.isArray(parsed)) {

                    transactions = parsed;

                }

            }

        } catch (error) {

            console.error(
                "Unable to load transactions:",
                error
            );

            transactions = [];

        }

    }


    function saveTransactions() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(transactions)
        );

    }


    /* =====================================================
       TYPE SELECTION
       ===================================================== */

    expenseTypeBtn.addEventListener(
        "click",
        () => {

            selectedType = "expense";

            updateTypeButtons();

        }
    );


    incomeTypeBtn.addEventListener(
        "click",
        () => {

            selectedType = "income";

            updateTypeButtons();

        }
    );


    function updateTypeButtons() {

        expenseTypeBtn.classList.toggle(
            "active",
            selectedType === "expense"
        );

        incomeTypeBtn.classList.toggle(
            "active",
            selectedType === "income"
        );

    }


    /* =====================================================
       QUICK ACTIONS
       ===================================================== */

    quickExpenseBtn.addEventListener(
        "click",
        () => {

            selectedType = "expense";

            updateTypeButtons();

            transactionTitle.focus();

            scrollToForm();

        }
    );


    quickIncomeBtn.addEventListener(
        "click",
        () => {

            selectedType = "income";

            updateTypeButtons();

            transactionTitle.focus();

            scrollToForm();

        }
    );


    emptyAddBtn.addEventListener(
        "click",
        () => {

            scrollToForm();

            transactionTitle.focus();

        }
    );


    function scrollToForm() {

        document
            .querySelector(".transaction-form-panel")
            ?.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

    }


    /* =====================================================
       ADD TRANSACTION
       ===================================================== */

    transactionForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            clearValidation();

            const title =
                transactionTitle.value.trim();

            const amount =
                Number(transactionAmount.value);

            const category =
                transactionCategory.value;

            const date =
                transactionDate.value;

            const description =
                transactionDescription.value.trim();


            let valid = true;


            /* Title validation */

            if (!title) {

                showFieldError(
                    transactionTitle,
                    "titleError",
                    "Please enter a transaction title."
                );

                valid = false;

            } else if (title.length < 2) {

                showFieldError(
                    transactionTitle,
                    "titleError",
                    "Title must contain at least 2 characters."
                );

                valid = false;

            }


            /* Amount validation */

            if (
                !transactionAmount.value ||
                Number.isNaN(amount) ||
                amount <= 0
            ) {

                showFieldError(
                    transactionAmount,
                    "amountError",
                    "Please enter a valid amount."
                );

                valid = false;

            }


            /* Category validation */

            if (!category) {

                showFieldError(
                    transactionCategory,
                    "categoryError",
                    "Please select a category."
                );

                valid = false;

            }


            /* Date validation */

            if (!date) {

                showFieldError(
                    transactionDate,
                    "dateError",
                    "Please select a date."
                );

                valid = false;

            }


            if (!valid) {

                showToast(
                    "Validation Error",
                    "Please check the highlighted fields.",
                    "error"
                );

                return;

            }


            /* Create transaction */

            const transaction = {

                id:
                    Date.now().toString(),

                title,

                amount,

                type: selectedType,

                category,

                date,

                description,

                createdAt:
                    new Date().toISOString()

            };


            transactions.unshift(transaction);

            saveTransactions();

            renderApp();

            resetTransactionForm();


            showToast(
                "Transaction Added",
                `${capitalize(selectedType)} added successfully.`,
                "success"
            );

        }
    );


    /* =====================================================
       RESET FORM
       ===================================================== */

    function resetTransactionForm() {

        transactionForm.reset();

        selectedType = "expense";

        updateTypeButtons();

        setDefaultDate();

        clearValidation();

    }


    /* =====================================================
       VALIDATION
       ===================================================== */

    function showFieldError(
        field,
        errorId,
        message
    ) {

        field.classList.add("input-error");

        const errorElement =
            document.getElementById(errorId);

        if (errorElement) {

            errorElement.textContent = message;

        }

    }


    function clearValidation() {

        document
            .querySelectorAll(".input-error")
            .forEach(element => {

                element.classList.remove(
                    "input-error"
                );

            });


        document
            .querySelectorAll(".error-message")
            .forEach(element => {

                element.textContent = "";

            });

    }


    /* =====================================================
       SEARCH
       ===================================================== */

    searchInput.addEventListener(
        "input",
        renderTransactions
    );


    /* =====================================================
       TYPE FILTER
       ===================================================== */

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(btn => {

                    btn.classList.remove("active");

                });

                button.classList.add("active");

                selectedFilter =
                    button.dataset.filter;

                renderTransactions();

            }
        );

    });


    /* =====================================================
       CATEGORY FILTER
       ===================================================== */

    categoryFilter.addEventListener(
        "change",
        renderTransactions
    );


    /* =====================================================
       FILTER TRANSACTIONS
       ===================================================== */

    function getFilteredTransactions() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();

        const selectedCategory =
            categoryFilter.value;


        return transactions.filter(transaction => {

            /* Type filter */

            if (
                selectedFilter !== "all" &&
                transaction.type !== selectedFilter
            ) {

                return false;

            }


            /* Category filter */

            if (
                selectedCategory !== "all" &&
                transaction.category !== selectedCategory
            ) {

                return false;

            }


            /* Search */

            if (search) {

                const searchableText = [

                    transaction.title,

                    transaction.category,

                    transaction.description || "",

                    transaction.type,

                    transaction.date

                ]
                    .join(" ")
                    .toLowerCase();


                if (
                    !searchableText.includes(search)
                ) {

                    return false;

                }

            }


            return true;

        });

    }


    /* =====================================================
       RENDER APP
       ===================================================== */

    function renderApp() {

        updateSummary();

        renderTransactions();

        updateAnalytics();

        updateInsights();

    }


    /* =====================================================
       SUMMARY CALCULATIONS
       ===================================================== */

    function updateSummary() {

        const income =
            transactions

                .filter(
                    transaction =>
                        transaction.type === "income"
                )

                .reduce(
                    (sum, transaction) =>
                        sum + Number(transaction.amount),
                    0
                );


        const expense =
            transactions

                .filter(
                    transaction =>
                        transaction.type === "expense"
                )

                .reduce(
                    (sum, transaction) =>
                        sum + Number(transaction.amount),
                    0
                );


        const balance =
            income - expense;


        totalIncome.textContent =
            formatMoney(income);

        totalExpense.textContent =
            formatMoney(expense);

        totalBalance.textContent =
            formatMoney(balance);

        netSavings.textContent =
            formatMoney(balance);


        /* Balance status */

        if (balance > 0) {

            balanceStatus.innerHTML =
                `<i class="fa-solid fa-arrow-trend-up"></i>
                 Positive balance`;

        } else if (balance < 0) {

            balanceStatus.innerHTML =
                `<i class="fa-solid fa-arrow-trend-down"></i>
                 Expenses exceed income`;

        } else {

            balanceStatus.innerHTML =
                `<i class="fa-solid fa-minus"></i>
                 No balance`;

        }


        /* Savings status */

        if (balance > 0) {

            savingsStatus.innerHTML =
                `<i class="fa-solid fa-piggy-bank"></i>
                 You are saving money`;

        } else if (balance < 0) {

            savingsStatus.innerHTML =
                `<i class="fa-solid fa-triangle-exclamation"></i>
                 Review your spending`;

        } else {

            savingsStatus.innerHTML =
                `<i class="fa-solid fa-minus"></i>
                 No savings yet`;

        }

    }


    /* =====================================================
       RENDER TRANSACTIONS
       ===================================================== */

    function renderTransactions() {

        const filtered =
            getFilteredTransactions();


        transactionList.innerHTML = "";


        if (filtered.length === 0) {

            emptyState.style.display = "block";

        } else {

            emptyState.style.display = "none";

            filtered.forEach(
                transaction => {

                    transactionList.appendChild(
                        createTransactionElement(
                            transaction
                        )
                    );

                }
            );

        }


        updateTransactionCount(
            filtered.length
        );

    }


    /* =====================================================
       CREATE TRANSACTION CARD
       ===================================================== */

    function createTransactionElement(
        transaction
    ) {

        const item =
            document.createElement("div");

        item.className =
            "transaction-item";


        const icon =
            categoryIcons[
                transaction.category
            ] || "fa-layer-group";


        const sign =
            transaction.type === "income"
                ? "+"
                : "-";


        const description =
            transaction.description
                ? escapeHTML(
                    transaction.description
                )
                : "";


        item.innerHTML = `

            <div class="transaction-icon ${transaction.type}">

                <i class="fa-solid ${icon}"></i>

            </div>


            <div class="transaction-main">

                <div class="transaction-title">

                    ${escapeHTML(transaction.title)}

                </div>


                <div class="transaction-meta">

                    <span class="category-badge">

                        ${escapeHTML(
                            transaction.category
                        )}

                    </span>


                    <span>

                        <i class="fa-regular fa-calendar"></i>

                        ${formatDate(
                            transaction.date
                        )}

                    </span>

                </div>


                ${
                    description
                        ? `
                        <div
                            class="transaction-description">

                            ${description}

                        </div>
                        `
                        : ""
                }

            </div>


            <div class="transaction-amount ${transaction.type}">

                ${sign} ₹${formatMoney(
                    transaction.amount
                )}

            </div>


            <div class="transaction-actions">

                <button
                    class="transaction-action edit"
                    data-action="edit"
                    data-id="${transaction.id}"
                    title="Edit">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    class="transaction-action delete"
                    data-action="delete"
                    data-id="${transaction.id}"
                    title="Delete">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;


        return item;

    }


    /* =====================================================
       TRANSACTION ACTIONS
       ===================================================== */

    transactionList.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-action]"
                );


            if (!button) {
                return;
            }


            const id =
                button.dataset.id;

            const action =
                button.dataset.action;


            if (action === "edit") {

                openEditModal(id);

            }


            if (action === "delete") {

                openDeleteModal(id);

            }

        }
    );


    /* =====================================================
       TRANSACTION COUNT
       ===================================================== */

    function updateTransactionCount(count) {

        transactionCount.textContent =
            `${count} ${
                count === 1
                    ? "transaction"
                    : "transactions"
            }`;

    }


    /* =====================================================
       EDIT MODAL
       ===================================================== */

    function openEditModal(id) {

        const transaction =
            transactions.find(
                item => item.id === id
            );


        if (!transaction) {
            return;
        }


        editTransactionId.value =
            transaction.id;

        editTitle.value =
            transaction.title;

        editAmount.value =
            transaction.amount;

        editCategory.value =
            transaction.category;

        editDate.value =
            transaction.date;

        editDescription.value =
            transaction.description || "";


        editModal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }


    function closeEdit() {

        editModal.classList.remove("show");

        document.body.style.overflow = "";

    }


    closeEditModal.addEventListener(
        "click",
        closeEdit
    );


    cancelEdit.addEventListener(
        "click",
        closeEdit
    );


    editModal.addEventListener(
        "click",
        event => {

            if (
                event.target === editModal
            ) {

                closeEdit();

            }

        }
    );


    /* =====================================================
       SAVE EDIT
       ===================================================== */

    editForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const id =
                editTransactionId.value;


            const transaction =
                transactions.find(
                    item => item.id === id
                );


            if (!transaction) {
                return;
            }


            const title =
                editTitle.value.trim();

            const amount =
                Number(editAmount.value);

            const category =
                editCategory.value;

            const date =
                editDate.value;

            const description =
                editDescription.value.trim();


            if (
                !title ||
                !amount ||
                amount <= 0 ||
                !category ||
                !date
            ) {

                showToast(
                    "Invalid Data",
                    "Please fill all required fields.",
                    "error"
                );

                return;

            }


            transaction.title =
                title;

            transaction.amount =
                amount;

            transaction.category =
                category;

            transaction.date =
                date;

            transaction.description =
                description;


            saveTransactions();

            renderApp();

            closeEdit();


            showToast(
                "Transaction Updated",
                "Your changes were saved successfully.",
                "success"
            );

        }
    );


    /* =====================================================
       DELETE MODAL
       ===================================================== */

    function openDeleteModal(id) {

        transactionToDelete = id;

        deleteModal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }


    function closeDelete() {

        deleteModal.classList.remove("show");

        transactionToDelete = null;

        document.body.style.overflow = "";

    }


    cancelDelete.addEventListener(
        "click",
        closeDelete
    );


    deleteModal.addEventListener(
        "click",
        event => {

            if (
                event.target === deleteModal
            ) {

                closeDelete();

            }

        }
    );


    /* =====================================================
       CONFIRM DELETE
       ===================================================== */

    confirmDelete.addEventListener(
        "click",
        () => {

            if (!transactionToDelete) {
                return;
            }


            transactions =
                transactions.filter(
                    transaction =>
                        transaction.id !==
                        transactionToDelete
                );


            saveTransactions();

            renderApp();

            closeDelete();


            showToast(
                "Transaction Deleted",
                "The transaction was removed.",
                "success"
            );

        }
    );


    /* =====================================================
       ANALYTICS
       ===================================================== */

    function updateAnalytics() {

        const expenses =
            transactions.filter(
                transaction =>
                    transaction.type === "expense"
            );


        const total =
            expenses.reduce(
                (sum, transaction) =>
                    sum + Number(transaction.amount),
                0
            );


        chartTotal.textContent =
            formatMoney(total);


        if (expenses.length === 0) {

            donutChart.style.background =
                "var(--border)";

            categoryLegend.innerHTML = `

                <div class="chart-empty">

                    <i class="fa-solid fa-chart-pie"></i>

                    <p>
                        Add expenses to see your
                        spending breakdown.
                    </p>

                </div>

            `;

            return;

        }


        /* Group categories */

        const categoryTotals = {};


        expenses.forEach(transaction => {

            if (!categoryTotals[
                transaction.category
            ]) {

                categoryTotals[
                    transaction.category
                ] = 0;

            }


            categoryTotals[
                transaction.category
            ] += Number(transaction.amount);

        });


        const categories =
            Object.entries(categoryTotals)
                .sort(
                    (a, b) => b[1] - a[1]
                );


        /* Build donut */

        let currentDegree = 0;

        const gradients = [];


        categories.forEach(
            ([category, amount]) => {

                const percentage =
                    (amount / total) * 100;

                const degree =
                    percentage * 3.6;

                const start =
                    currentDegree;

                const end =
                    currentDegree + degree;

                const color =
                    categoryColors[
                        category
                    ] || "#94a3b8";


                gradients.push(
                    `${color} ${start}deg ${end}deg`
                );


                currentDegree = end;

            }
        );


        donutChart.style.background =
            `conic-gradient(${gradients.join(", ")})`;


        /* Legend */

        categoryLegend.innerHTML =
            categories
                .map(
                    ([category, amount]) => {

                        const percentage =
                            (
                                amount / total
                            ) * 100;


                        const color =
                            categoryColors[
                                category
                            ] || "#94a3b8";


                        return `

                            <div class="legend-item">

                                <span
                                    class="legend-dot"
                                    style="
                                        background:${color};
                                    ">
                                </span>


                                <div class="legend-content">

                                    <span>
                                        ${escapeHTML(
                                            category
                                        )}
                                    </span>

                                    <strong>
                                        ₹${formatMoney(
                                            amount
                                        )}
                                        ·
                                        ${percentage.toFixed(
                                            1
                                        )}%
                                    </strong>

                                </div>

                            </div>

                        `;

                    }
                )
                .join("");

    }


    /* =====================================================
       FINANCIAL INSIGHTS
       ===================================================== */

    function updateInsights() {

        const expenses =
            transactions.filter(
                transaction =>
                    transaction.type === "expense"
            );


        const totalExpenseAmount =
            expenses.reduce(
                (sum, transaction) =>
                    sum + Number(transaction.amount),
                0
            );


        const average =
            expenses.length
                ? totalExpenseAmount /
                  expenses.length
                : 0;


        averageExpense.textContent =
            formatMoney(average);


        totalTransactionsInsight.textContent =
            transactions.length;


        /* Highest spending category */

        if (!expenses.length) {

            topCategory.textContent = "—";

            return;

        }


        const categoryTotals = {};


        expenses.forEach(transaction => {

            categoryTotals[
                transaction.category
            ] =
                (
                    categoryTotals[
                        transaction.category
                    ] || 0
                ) +
                Number(transaction.amount);

        });


        const highest =
            Object.entries(categoryTotals)
                .sort(
                    (a, b) => b[1] - a[1]
                )[0];


        if (highest) {

            topCategory.textContent =
                `${highest[0]} · ₹${formatMoney(
                    highest[1]
                )}`;

        }

    }


    /* =====================================================
       DARK MODE
       ===================================================== */

    themeBtn.addEventListener(
        "click",
        toggleTheme
    );


    function toggleTheme() {

        document.body.classList.toggle(
            "dark-mode"
        );


        const dark =
            document.body.classList.contains(
                "dark-mode"
            );


        localStorage.setItem(
            THEME_KEY,
            dark ? "dark" : "light"
        );


        updateThemeIcon();

    }


    function loadTheme() {

        const savedTheme =
            localStorage.getItem(
                THEME_KEY
            );


        if (savedTheme === "dark") {

            document.body.classList.add(
                "dark-mode"
            );

        }


        updateThemeIcon();

    }


    function updateThemeIcon() {

        const icon =
            themeBtn.querySelector("i");


        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            icon.className =
                "fa-solid fa-sun";

            themeBtn.title =
                "Switch to light mode";

        } else {

            icon.className =
                "fa-solid fa-moon";

            themeBtn.title =
                "Switch to dark mode";

        }

    }


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(
        title,
        message,
        type = "success"
    ) {

        clearTimeout(toastTimer);


        toastTitle.textContent =
            title;

        toastMessage.textContent =
            message;


        if (type === "error") {

            toastIcon.innerHTML =
                `<i class="fa-solid fa-circle-exclamation"></i>`;

            toastIcon.style.color =
                "var(--red)";

            toastIcon.style.background =
                "var(--red-soft)";

        } else {

            toastIcon.innerHTML =
                `<i class="fa-solid fa-check"></i>`;

            toastIcon.style.color =
                "var(--green)";

            toastIcon.style.background =
                "var(--green-soft)";

        }


        toast.classList.add("show");


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                3500
            );

    }


    closeToast.addEventListener(
        "click",
        () => {

            toast.classList.remove(
                "show"
            );

        }
    );


    /* =====================================================
       KEYBOARD SHORTCUTS
       ===================================================== */

    function setupKeyboardShortcuts() {

        document.addEventListener(
            "keydown",
            event => {

                /* Ctrl + K */

                if (
                    (event.ctrlKey ||
                        event.metaKey) &&
                    event.key.toLowerCase() === "k"
                ) {

                    event.preventDefault();

                    searchInput.focus();

                }


                /* Escape */

                if (
                    event.key === "Escape"
                ) {

                    closeEdit();

                    closeDelete();

                    toast.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /* =====================================================
       UTILITY FUNCTIONS
       ===================================================== */

    function capitalize(value) {

        return value.charAt(0)
            .toUpperCase() +
            value.slice(1);

    }


    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }

});